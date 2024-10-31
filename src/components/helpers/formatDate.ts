import { parseISO } from 'date-fns';

export function formatPostDate(date: string): string {
    const now = new Date();
    const pastDate = new Date(parseISO(date).getTime() - now.getTimezoneOffset() * 60000);
    const diffInSeconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return "agora"
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return diffInMinutes === 1 ? '1 minuto atrás' : `${diffInMinutes} minutos atrás`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return diffInHours === 1 ? '1 hora atrás' : `${diffInHours} horas atrás`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return diffInDays === 1 ? '1 dia atrás' : `${diffInDays} dias atrás`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
        return diffInWeeks === 1 ? '1 semana atrás' : `${diffInWeeks} semanas atrás`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return diffInMonths === 1 ? '1 mês atrás' : `${diffInMonths} meses atrás`;
    }

    const diffInYears = Math.floor(diffInDays / 365);
    return diffInYears === 1 ? '1 ano atrás' : `${diffInYears} anos atrás`;
}
