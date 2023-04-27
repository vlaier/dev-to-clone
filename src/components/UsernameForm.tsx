import { useUser } from '@/lib/hooks';
import React, { useEffect, useState } from 'react';

const UsernameForm = () => {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, username } = useUser();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    setFormValue(val);
    setIsValid(false);
    if (re.test(val)) {
      setLoading(true);
    }
  };

  const checkUsername = async (username: string) => {};
  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);
  return (
    <section>
      <h3>Choose Username</h3>
      <form onSubmit={() => console.log('submit')}>
        <input
          name="username"
          placeholder="username"
          value={formValue}
          onChange={onChange}
        />
        <button type="submit" className="btn-green" disabled={!isValid}>
          Choose
        </button>
      </form>
      <h3>Debug State</h3>
      <div>
        Username: {formValue}
        <br />
        Loading: {loading.toString()}
        <br />
        Username Valid: {isValid.toString()}
      </div>
    </section>
  );
};

export default UsernameForm;
