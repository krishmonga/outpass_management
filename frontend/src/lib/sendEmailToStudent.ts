import { useAppSelector } from "@/redux/hooks";

export const sendEmailToStudent = async () => {
  const textarea = document.getElementById("email-textarea") as HTMLTextAreaElement | null;
  if (textarea) {
    try {
      const emailMessage =textarea.value;
      const wardenMail = useAppSelector(state => state.authUser.user?.email)
      
      console.log('this is the messaage', emailMessage)
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  } else {
    console.error('Textarea with id "email-textarea" not found');
  }
};