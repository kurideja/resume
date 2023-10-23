interface Props {
  disabled?: boolean;
}

export function ResumeLink(props: Props) {
  const { disabled } = props;

  return (
    <button
      disabled={disabled}
      className="disabled:opacity-50 disabled:cursor-not-allowed"
      role="link"
    >
      Download resume
    </button>
  );
}
