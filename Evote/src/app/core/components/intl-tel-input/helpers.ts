import {
  PhoneNumber,
  PhoneNumberFormat,
  PhoneNumberUtil,
} from 'google-libphonenumber';

// @internal
export function sanitize(value: string) {
  if (value.startsWith('00')) {
    return `+${value.slice(2)}`;
  } else if (value.startsWith('+')) {
    return value;
  } else {
    return `+${value}`;
  }
}

export const getPhoneNumberPlaceHolder = (
  region: string,
  format: PhoneNumberFormat
) => {
  const instance = PhoneNumberUtil.getInstance();
  try {
    const phoneNumber = instance.parse('90000505', region);
    return phoneNumberAsString(phoneNumber, format, instance);
  } catch (e) {
    return e;
  }
};

export const phoneNumberAsString = (
  number: PhoneNumber,
  format: PhoneNumberFormat,
  instance?: PhoneNumberUtil
) => {
  instance = instance || PhoneNumberUtil.getInstance();
  return instance.format(number, format);
};

export const safeValidatePhoneNumber = (
  _phoneNumber: string,
  instance?: PhoneNumberUtil
) => {
  instance = instance || PhoneNumberUtil.getInstance();
  try {
    let threatedInput: string;
    threatedInput = sanitize(String(_phoneNumber) as string);
    const phoneNumber = instance.parseAndKeepRawInput(threatedInput);
    if (!instance.isValidNumber(phoneNumber)) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};
