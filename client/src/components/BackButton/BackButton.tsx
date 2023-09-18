import { useNavigate } from 'react-router-dom';

import { Button } from '../Button/Button.tsx';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="back"
      onClick={() => {
        navigate(-1);
      }}
      preventFormSubmission
    >
      &larr; Back
    </Button>
  );
}
