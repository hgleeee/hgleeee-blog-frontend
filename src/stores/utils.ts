export function formatTimeAgo(targetDate: Date): string {
    const now = new Date();
    const date = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
    const diffMilliseconds = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
  
    if (diffDays > 7) {
      return dateExpression(date);
    } else if (diffDays > 0) {
      return `${diffDays}일 전`;
    } else if (diffHours > 0) {
      return `${diffHours}시간 전`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}분 전`;
    } else {
      return '방금 전';
    }
}

export function dateExpression(date: Date): string {
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
  
    const time = date.getHours() + ":" + ("0" + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day} ${time}`
}

export function dateExpressionBrief(date: Date): string {
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${month}월 ${day}일, ${year}년`
}

export function convertToString(value: string | string[]) : string {
  if (typeof value === 'string') {
    return value;
  } else {
    return value.join(', ');
  }
}

export function manageNotAuthorizedAccess() {
  alert("해당 페이지에 접근 권한이 없습니다.");
  window.location.href = '/';
}