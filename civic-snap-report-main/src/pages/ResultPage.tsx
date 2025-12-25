import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { CheckCircle, AlertTriangle, Home, Camera, Building2 } from "lucide-react";
import { ClassificationResult, getCategoryIcon } from "@/utils/mlClassifier";
import { LocationData } from "@/utils/geolocation";

interface ResultState {
  imagePreview: string;
  classification: ClassificationResult;
  location: LocationData | null;
  submittedAt: string;
}

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultState | null;

  // Redirect if no state (direct access)
  if (!state) {
    return <Navigate to="/" replace />;
  }

  const { imagePreview, classification, submittedAt } = state;
  const isValid = classification.isValid;

  return (
    <main className="flex-1 container py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* Status Header */}
        <div className="text-center mb-8 animate-fade-in">
          {isValid ? (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/15 mb-4">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Issue Reported Successfully</h2>
              <div className="status-badge status-submitted">
                Submitted
              </div>
            </>
          ) : (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warning/15 mb-4">
                <AlertTriangle className="w-8 h-8 text-warning" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Image Not Clear</h2>
              <p className="text-sm text-muted-foreground">Please upload a clearer image</p>
            </>
          )}
        </div>

        {/* Image Preview */}
        <div className="gov-card mb-6 animate-slide-up">
          <img
            src={imagePreview}
            alt="Submitted issue"
            className="w-full h-auto rounded-lg max-h-[250px] object-contain"
          />
        </div>

        {/* Classification Result */}
        <div className="gov-card mb-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Issue Detected</h3>
          <div className="category-badge text-base">
            <span className="text-xl">{getCategoryIcon(classification.category)}</span>
            {classification.label}
          </div>
        </div>

        {/* Department Routing - Only show if valid */}
        {isValid && (
          <div className="gov-card mb-6 animate-slide-up" style={{ animationDelay: "150ms" }}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Forwarded To</h3>
                <p className="font-medium text-foreground">{classification.department}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Further updates will be provided by the department.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submission Time */}
        {isValid && (
          <div className="text-center text-xs text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
            Submitted on {new Date(submittedAt).toLocaleString()}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: "250ms" }}>
          {!isValid && (
            <button
              onClick={() => navigate("/upload")}
              className="gov-button w-full flex items-center justify-center gap-3"
            >
              <Camera className="w-5 h-5" />
              Upload Another Photo
            </button>
          )}
          
          <button
            onClick={() => navigate("/")}
            className="gov-button-secondary w-full flex items-center justify-center gap-3"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>

          {isValid && (
            <button
              onClick={() => navigate("/upload")}
              className="gov-button-secondary w-full flex items-center justify-center gap-3"
            >
              <Camera className="w-5 h-5" />
              Report Another Issue
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default ResultPage;
