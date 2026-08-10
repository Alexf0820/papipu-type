import {
  PARENT_PROJECT_NAME,
  PARENT_PROJECT_URL,
} from "@/lib/brand/labels";

type ParentProjectLinkProps = {
  className?: string;
};

export function ParentProjectLink({ className }: ParentProjectLinkProps) {
  return (
    <a
      href={PARENT_PROJECT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {PARENT_PROJECT_NAME}
    </a>
  );
}
