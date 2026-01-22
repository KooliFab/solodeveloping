import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Save an email address to Firestore
 * @param {string} email - The email address to save
 * @param {string} language - The current language preference
 * @returns {Promise<Object>} - Result of the operation
 */
export const saveEmailSubscription = async (email, language = 'en') => {
  try {
    // First check if the email already exists
    const emailsRef = collection(db, 'newsletter_subscribers');
    // const q = query(emailsRef, where('email', '==', email));
    // const querySnapshot = await getDocs(q);

    // if (!querySnapshot.empty) {
    //   return { success: false, message: 'This email is already subscribed.' };
    // }

    // Add the new email document
    const docRef = await addDoc(emailsRef, {
      email,
      language,
      createdAt: new Date(),
      source: window.location.hostname, // Track which site the subscription came from
    });

    return {
      success: true,
      message: 'Thank you for subscribing!',
      id: docRef.id
    };
  } catch (error) {
    console.error('Error saving email subscription:', error);
    return {
      success: false,
      message: 'Unable to subscribe at this time. Please try again later.'
    };
  }
};

/**
 * Save a book lead with UTM parameters to Firestore
 * @param {string} email - The email address to save
 * @param {Object} options - Additional options
 * @param {string} options.utmSource - UTM source parameter
 * @param {string} options.utmMedium - UTM medium parameter
 * @param {string} options.utmCampaign - UTM campaign parameter
 * @param {string} options.language - The current language preference
 * @returns {Promise<Object>} - Result of the operation
 */
export const saveBookLead = async (email, options = {}) => {
  try {
    const {
      utmSource = '',
      utmMedium = '',
      utmCampaign = '',
      language = 'en'
    } = options;

    // Add the book lead document
    const bookLeadsRef = collection(db, 'book_leads');
    const docRef = await addDoc(bookLeadsRef, {
      email,
      language,
      utmSource,
      utmMedium,
      utmCampaign,
      createdAt: new Date(),
      source: window.location.hostname,
      referrer: document.referrer || '',
      emailSent: false, // Track whether the email link has been sent
    });

    return {
      success: true,
      message: 'Thank you! Check your email for the link.',
      id: docRef.id
    };
  } catch (error) {
    console.error('Error saving book lead:', error);
    return {
      success: false,
      message: 'Unable to save your information. Please try again later.'
    };
  }
}; 