import React from 'react';
import { Twitter, Linkedin, Link2, Facebook } from 'lucide-react';
import { toast } from 'sonner';

const ShareButton = ({ icon: Icon, onClick, label }) => (
  <button
    onClick={onClick}
    className="p-3 rounded-full bg-secondary/50 text-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg border border-primary/10"
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
  </button>
);

const ShareButtons = ({ title, url, description }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="flex lg:flex-col gap-4 items-center justify-center lg:sticky lg:top-24">
      <ShareButton 
        icon={Twitter} 
        label="Share on Twitter"
        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, '_blank')}
      />
      <ShareButton 
        icon={Linkedin} 
        label="Share on LinkedIn"
        onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodeURIComponent(description || '')}`, '_blank')}
      />
      <ShareButton 
        icon={Facebook} 
        label="Share on Facebook"
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank')}
      />
      <ShareButton 
        icon={Link2} 
        label="Copy Link"
        onClick={handleCopyLink}
      />
    </div>
  );
};

export default ShareButtons;
