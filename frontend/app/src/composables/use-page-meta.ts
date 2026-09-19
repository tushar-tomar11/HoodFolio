export function usePageMeta(title: string, description: string): void {
  onMounted(() => {
    if (typeof document === 'undefined')
      return;
    document.title = title;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', description);
  });
}
