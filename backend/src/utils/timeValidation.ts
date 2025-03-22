export function isValidAppointment(dateStr: string, timeStr: string): boolean {
    const date = new Date(`${dateStr}T${timeStr}`);
    const now = new Date();
  
    if (date < now) return false;
  
    const day = date.getDay(); // 0 = domingo, 6 = sábado
    if (day === 0 || day === 6) return false;
  
    const hour = date.getHours();
    return (hour >= 9 && hour < 14) || (hour >= 16 && hour < 19);
  }
  