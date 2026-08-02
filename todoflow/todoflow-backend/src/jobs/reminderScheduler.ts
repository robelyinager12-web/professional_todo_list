import { generateDueReminders } from "../services/notification.service";

const CHECK_INTERVAL_MS = 60 * 1000;

export function startReminderScheduler() {
  setInterval(async () => {
    try {
      const created = await generateDueReminders();
      if (created > 0) {
        console.log(`Generated ${created} reminder notification(s)`);
      }
    } catch (err) {
      console.error("Reminder scheduler error:", err);
    }
  }, CHECK_INTERVAL_MS);

  console.log("Reminder scheduler started (checking every 60s)");
}