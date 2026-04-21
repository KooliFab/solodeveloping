import React, { useState } from 'react';
import { saveEmailSubscription } from '@/lib/emailService';
import { useToast } from '@/components/ui/use-toast';

const EmailSubscription = ({ buttonText = 'Subscribe', placeholderText = 'Enter your email' }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await saveEmailSubscription(email);
      
      if (result.success) {
        toast({
          title: 'Success!',
          description: result.message,
        });
        setEmail('');
      } else {
        toast({
          title: 'Subscription Failed',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholderText}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary flex-grow text-gray-800 bg-white"
        disabled={isLoading}
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 whitespace-nowrap"
        disabled={isLoading}
      >
        {isLoading ? 'Subscribing...' : buttonText}
      </button>
    </form>
  );
};

export default EmailSubscription;