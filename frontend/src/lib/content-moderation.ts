import leoProfanity from "leo-profanity";

// Initialize leo-profanity with English dictionary
leoProfanity.loadDictionary("en");

// Custom prohibited words/patterns for adult content platform
const PROHIBITED_PATTERNS = [
  // Spam patterns
  /\b(buy now|click here|free money|make \$\d+|earn \$\d+)\b/i,
  /\b(bitcoin|crypto|nft).*(giveaway|free|airdrop)/i,
  /\b(telegram|whatsapp|discord).*\.(me|gg|com)\/\S+/i,

  // Scam keywords
  /\b(nigerian prince|lottery winner|wire transfer|western union)\b/i,
  /\b(bank account|credit card|ssn|social security)\b/i,
  /\b(verify your|confirm your|update your).*(account|password|payment)/i,

  // Illegal content indicators
  /\b(underage|minor|jailbait|preteen)\b/i,
  /\b(revenge porn|leaked nudes|stolen content)\b/i,
  /\b(doxxing|swatting|hack.*account)\b/i,

  // Impersonation patterns
  /\b(official account|verified creator|real \w+)\b/i,
  /\b(not a scam|100% legit|trust me)\b/i,
];

// Additional word blocklist (beyond leo-profanity defaults)
const CUSTOM_BLOCKLIST = [
  // Extreme/illegal terms (keeping list minimal and non-specific)
  "cp",
  "jailbait",
  "deepfake",
  // Scam-related
  "cashapp",
  "venmo",
  "paypal",
  "zelle",
  // When used suspiciously in bio context
  "dm for prices",
  "dm for menu",
  "telegram only",
];

// Add custom words to leo-profanity
leoProfanity.add(CUSTOM_BLOCKLIST);

export interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

/**
 * Validates content against profanity filters and prohibited patterns
 */
export function validateContent(text: string): ValidationResult {
  if (!text || typeof text !== "string") {
    return { isValid: true };
  }

  const normalizedText = text.toLowerCase().trim();

  // Check leo-profanity (includes our custom blocklist)
  if (leoProfanity.check(normalizedText)) {
    return {
      isValid: false,
      reason: "Content contains prohibited words or phrases.",
    };
  }

  // Check custom patterns
  for (const pattern of PROHIBITED_PATTERNS) {
    if (pattern.test(text)) {
      return {
        isValid: false,
        reason: "Content matches prohibited patterns.",
      };
    }
  }

  // Check for excessive caps (spam indicator)
  const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length;
  if (text.length > 20 && capsRatio > 0.7) {
    return {
      isValid: false,
      reason: "Excessive use of capital letters.",
    };
  }

  // Check for repetitive characters (spam indicator)
  if (/(.)\1{5,}/.test(text)) {
    return {
      isValid: false,
      reason: "Excessive character repetition.",
    };
  }

  return { isValid: true };
}

/**
 * Cleans/censors profanity from text (for display purposes)
 */
export function cleanContent(text: string): string {
  if (!text || typeof text !== "string") {
    return text;
  }
  return leoProfanity.clean(text);
}

/**
 * Checks if specific field content is appropriate
 */
export function validateProfileField(
  field: "username" | "displayName" | "bio" | "longBio",
  value: string
): ValidationResult {
  const baseValidation = validateContent(value);
  if (!baseValidation.isValid) {
    return baseValidation;
  }

  // Field-specific validations
  switch (field) {
    case "username":
      // No special characters except underscore
      if (!/^[a-z0-9_]+$/.test(value)) {
        return {
          isValid: false,
          reason: "Username can only contain lowercase letters, numbers, and underscores.",
        };
      }
      // No impersonation patterns
      if (/^(admin|mod|staff|official|support|biofound)/i.test(value)) {
        return {
          isValid: false,
          reason: "Username cannot impersonate staff or official accounts.",
        };
      }
      break;

    case "displayName":
      // No URLs in display name
      if (/https?:\/\/|www\./i.test(value)) {
        return {
          isValid: false,
          reason: "Display name cannot contain URLs.",
        };
      }
      break;

    case "bio":
    case "longBio":
      // Allow more flexibility but check for spam patterns
      if ((value.match(/https?:\/\//g) || []).length > 5) {
        return {
          isValid: false,
          reason: "Too many links in bio.",
        };
      }
      break;
  }

  return { isValid: true };
}
