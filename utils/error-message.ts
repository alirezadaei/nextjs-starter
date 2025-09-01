type ErrorMessage = {
  message?: string;
  description?: string;
};

/**
 * Error handling utility for API responses
 * Provides specific error messages based on HTTP status codes
 * @param error - Error object from API response
 * @param toast - Toast notification function (from UI library like Ant Design)
 * @param notification - Notification instance from Ant Design context
 */
export const errorMessage = (
  error: Error,
  notification: any,
  customErrorMessage?: Record<number, ErrorMessage>
) => {
  // Extract status code and error message if available
  const status = Number(error.message);

  // Handle specific HTTP status codes
  switch (status) {
    case 400:
      notification.error({
        message: customErrorMessage?.[400].message ?? "درخواست نادرست",
        description:
          customErrorMessage?.[400].description ??
          "درخواست شما دارای مقدار یا مقادیر نادرستی است",
        style: { direction: "rtl" },
      });
      break;
    case 401:
      notification.error({
        message: customErrorMessage?.[401].message ?? "خطای احراز هویت",
        description:
          customErrorMessage?.[401].description ?? "لطفا مجددا وارد شوید",
        style: { direction: "rtl" },
      });
      break;
    case 403:
      notification.error({
        message: customErrorMessage?.[403].message ?? "دسترسی غیرمجاز",
        description:
          customErrorMessage?.[403].description ??
          "شما مجوز دسترسی به این بخش را ندارید",
        style: { direction: "rtl" },
      });
      break;
    case 404:
      notification.error({
        message: customErrorMessage?.[404].message ?? "یافت نشد",
        description:
          customErrorMessage?.[404].description ?? "منبع مورد نظر یافت نشد",
        style: { direction: "rtl" },
      });
      break;
    case 422:
      notification.error({
        message: customErrorMessage?.[422].message ?? "خطای اعتبارسنجی",
        description:
          customErrorMessage?.[422].description ??
          "داده‌های ارسالی معتبر نیستند",
        style: { direction: "rtl" },
      });
      break;
    case 429:
      notification.error({
        message: customErrorMessage?.[429].message ?? "درخواست بیش از حد",
        description:
          customErrorMessage?.[429].description ??
          "لطفا کمی صبر کنید و دوباره تلاش کنید",
        style: { direction: "rtl" },
      });
      break;
    case 500:
    case 502:
    case 503:
      notification.error({
        message: customErrorMessage?.[500 | 502 | 503].message ?? "خطای سرور",
        description:
          customErrorMessage?.[500 | 502 | 503].description ??
          "مشکلی در سرور رخ داده است، لطفا بعدا تلاش کنید",
        style: { direction: "rtl" },
      });
      break;
    default:
      notification.error({
        message: "خطای ناشناخته",
        description: "لطفا مجددا تلاش کنید یا با پشتیبانی تماس بگیرید",
        style: { direction: "rtl" },
      });
  }

  // Log error for debugging
  if (process.env.NODE_ENV !== "production") {
    console.error("API Error:", error);
  }
};
