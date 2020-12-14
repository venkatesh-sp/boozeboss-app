import { Alert } from 'rsuite';

const alert_status = (message, type, duration) => {
  const event_duration = duration || 2500;
  if (type === 'success') {
    Alert.success(message, event_duration);
  }
  if (type === 'error') {
    Alert.error(message, event_duration);
  }
};

export default alert_status;
