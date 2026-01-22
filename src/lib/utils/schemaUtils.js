/**
 * Utility functions for generating structured data (JSON-LD) for Schema.org
 */

/**
 * Generate JSON-LD script element for Schema.org structured data
 * @param {object} schemaData - The schema data object to be stringified
 * @returns {JSX.Element} - Script element with JSON-LD data
 */
export const generateJsonLd = (schemaData) => {
  return (
    <script type="application/ld+json">
      {JSON.stringify(schemaData)}
    </script>
  );
};

/**
 * Generate Book schema for Schema.org
 * @param {object} bookData - Book data
 * @param {string} bookData.name - Book name
 * @param {string} bookData.description - Book description
 * @param {string} bookData.image - Book image URL
 * @param {string} bookData.minAge - Minimum suggested age
 * @param {string} bookData.maxAge - Maximum suggested age
 * @param {string} bookData.educationalUse - Educational use description
 * @returns {object} - Book schema object
 */
export const generateBookSchema = ({
  name,
  description,
  image,
  minAge = "3",
  maxAge = "10",
  educationalUse = "Primary Education"
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name,
    description,
    image,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    },
    "audience": {
      "@type": "PeopleAudience",
      "suggestedMinAge": minAge,
      "suggestedMaxAge": maxAge
    },
    "educationalUse": educationalUse
  };
};

/**
 * Generate Product schema for Schema.org
 * @param {object} productData - Product data
 * @param {string} productData.name - Product name
 * @param {string} productData.description - Product description
 * @param {string} productData.image - Product image URL
 * @param {string} productData.brand - Product brand name
 * @returns {object} - Product schema object
 */
export const generateProductSchema = ({
  name,
  description,
  image,
  brand = "Cogni"
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  };
};

/**
 * Generate SoftwareApplication schema for Schema.org
 * @param {object} appData - App data
 * @param {string} appData.name - App name
 * @param {string} appData.description - App description
 * @param {string} appData.image - App image URL
 * @param {string} appData.category - App category
 * @param {string} appData.operatingSystem - Operating systems supported
 * @returns {object} - SoftwareApplication schema object
 */
export const generateAppSchema = ({
  name,
  description,
  image,
  category = "EducationalApplication",
  operatingSystem = "iOS, Android"
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    image,
    "applicationCategory": category,
    "operatingSystem": operatingSystem,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  };
};