import {
  AlertCircleIcon,
  TriangleAlertIcon,
  NotebookPenIcon,
  LightbulbIcon,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CustomAlert = ({
  children,
  type,
  title,
}: {
  children: React.ReactNode;
  type: "note" | "warning" | "tip" | "danger";
  title?: string;
}) => {
  if (!title) {
    title = type.toUpperCase();
  }

  return (
    <Alert
      className="my-5"
      variant={type == "danger" ? "destructive" : "default"}
    >
      {type == "note" && <NotebookPenIcon className="stroke-green-500" />}
      {type == "warning" && <TriangleAlertIcon className="stroke-orange-500" />}
      {type == "tip" && <LightbulbIcon className="stroke-yellow-300" />}
      {type == "danger" && <AlertCircleIcon />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};

export default CustomAlert;
