import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, X, Loader2, MapPin, AlertCircle } from "lucide-react";
import { getCurrentLocation, LocationData } from "@/utils/geolocation";
import { classifyImage, ClassificationResult } from "@/utils/mlClassifier";
import { useToast } from "@/hooks/use-toast";

const UploadPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Capture location on mount
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const loc = await getCurrentLocation();
        setLocation(loc);
        setLocationError(null);
      } catch (error: any) {
        setLocationError(error.message);
        toast({
          title: "Location Access",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoadingLocation(false);
      }
    };

    fetchLocation();
  }, [toast]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid File",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Classify the image
      const result: ClassificationResult = await classifyImage(selectedImage);

      // Navigate to result page with data
      navigate("/result", {
        state: {
          imagePreview,
          classification: result,
          location,
          submittedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process image. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 container py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-xl font-bold text-foreground mb-2">Upload Issue Photo</h2>
          <p className="text-sm text-muted-foreground">
            Take or select a clear photo of the issue
          </p>
        </div>

        {/* Location Status */}
        <div className="mb-6 animate-slide-up">
          <div className="gov-card flex items-center gap-3 py-3">
            {isLoadingLocation ? (
              <>
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                <span className="text-sm text-muted-foreground">Capturing location...</span>
              </>
            ) : location ? (
              <>
                <MapPin className="w-5 h-5 text-accent" />
                <span className="text-sm text-foreground">Location captured</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-warning" />
                <span className="text-sm text-muted-foreground">Location unavailable</span>
              </>
            )}
          </div>
        </div>

        {/* Image Upload Area */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
          {!imagePreview ? (
            <label
              htmlFor="image-upload"
              className="gov-card flex flex-col items-center justify-center min-h-[280px] cursor-pointer 
                         border-2 border-dashed border-border hover:border-primary/50 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <p className="font-medium text-foreground mb-1">Tap to upload photo</p>
              <p className="text-sm text-muted-foreground">or drag and drop</p>
              <input
                ref={fileInputRef}
                id="image-upload"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          ) : (
            <div className="gov-card relative">
              <button
                onClick={handleRemoveImage}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-foreground/80 text-background 
                           flex items-center justify-center hover:bg-foreground transition-colors z-10"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={imagePreview}
                alt="Selected issue"
                className="w-full h-auto rounded-lg max-h-[400px] object-contain"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <button
            onClick={handleSubmit}
            disabled={!selectedImage || isSubmitting}
            className="gov-button w-full flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Image...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Submit Report
              </>
            )}
          </button>

          <button
            onClick={() => navigate("/")}
            className="gov-button-secondary w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
};

export default UploadPage;
