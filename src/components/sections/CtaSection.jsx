import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { useTranslation } from "react-i18next";
import { trackButtonClick } from "@/utils/slackNotifier";

// Lazy load Firebase emailService (281KB) only when needed

const CtaSection = ({ handleBuyNow }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t, i18n } = useTranslation();

  // Sample images for the carousel with 800/730 ratio
  const carouselImages = [
    {
      src: "/images/app/en/demo1.webp",
      alt: "Colorful books on a shelf",
      caption: "Create new episodes and build your own story",
    },
    {
      src: "/images/app/en/demo2.webp",
      alt: "Child reading a book",
      caption: "Read your story in multiple languages",
    },
    {
      src: "/images/app/en/demo3.webp",
      alt: "Colorful toys",
      caption: "Solve playful, kid-friendly puzzles",
    },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: t("ctaSection.emailRequiredTitle"),
        description: t("ctaSection.emailRequiredDesc"),
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Dynamically import Firebase emailService only when user subscribes
      const { saveEmailSubscription } = await import("@/lib/emailService");
      const result = await saveEmailSubscription(email, i18n.language);

      if (result.success) {
        // Track successful newsletter subscription with translated button label
        trackButtonClick(t("ctaSection.subscribeButton"), {
          'Email': email.replace(/(.{2})(.*)(@.*)/, '$1***$3'), // Partially hide email
          'Language': i18n.language,
          'Status': 'Success',
        });
        
        toast({
          title: t("ctaSection.subscribedTitle"),
          description: t("ctaSection.subscribedDesc"),
          duration: 5000,
        });
        setEmail("");
      } else {
        toast({
          title: "Subscription Failed",
          description: result.message,
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="free-story" className="py-12 md:py-16 lg:py-20 hero-gradient text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t("ctaSection.title")}
          </h2>
          <p className="text-xl mb-10 text-white/90">
            {t("ctaSection.description")}
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto"
          >
            <div className="relative flex-grow w-full sm:w-auto">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder={t("ctaSection.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 text-gray-800 rounded-full h-11 w-full"
                aria-label="Email address for newsletter"
                disabled={isLoading}
                required
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="rounded-full bg-white text-primary hover:bg-white/90 w-full sm:w-auto disabled:opacity-50"
              disabled={isLoading}
            >
              <Send className="mr-2 h-5 w-5" />
              {isLoading ? "Subscribing..." : t("ctaSection.subscribeButton")}
            </Button>
          </form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <ImageCarousel images={carouselImages} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
