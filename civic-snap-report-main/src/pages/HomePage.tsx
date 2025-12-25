import { Camera, MapPin, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Camera,
      title: "Take a Photo",
      description: "Capture the issue with your camera",
    },
    {
      icon: MapPin,
      title: "Auto Location",
      description: "Your location is captured automatically",
    },
    {
      icon: CheckCircle,
      title: "Quick Submission",
      description: "Issue routed to the right department",
    },
  ];

  return (
    <main className="flex-1 container py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Camera className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Report Civic Issues Instantly
          </h2>
          <p className="text-muted-foreground">
            Simply upload a photo of the problem. We'll identify the issue and forward it to the concerned department.
          </p>
        </section>

        {/* Features */}
        <section className="grid gap-4 mb-10">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="gov-card flex items-center gap-4 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* CTA Button */}
        <section className="animate-slide-up" style={{ animationDelay: "300ms" }}>
          <button
            onClick={() => navigate("/upload")}
            className="gov-button w-full text-lg py-4 flex items-center justify-center gap-3"
          >
            <Camera className="w-5 h-5" />
            Upload Photo
          </button>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Your location will be captured automatically for accurate reporting
          </p>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
