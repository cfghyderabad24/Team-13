import { sendEscalationNotification } from "./SendEscalationNotification.js";

function scheduleDailyCheck() {
  sendEscalationNotification()
    .then(() => {
      const now = new Date();
      const nextCheck = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0
      ); // Next midnight
      const timeUntilNextCheck = nextCheck - now;

      setTimeout(scheduleDailyCheck, timeUntilNextCheck);
    })
    .catch((err) => {
      console.error("Error checking notifications:", err);
      // Retry after 1 minute if there's an error
      setTimeout(scheduleDailyCheck, 60000);
    });
}

// Start the initial check
scheduleDailyCheck();

export default scheduleDailyCheck;
