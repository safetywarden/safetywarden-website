function IconBubble({ label, tone }: { label: string; tone: 'dark' | 'sky' | 'orange' }) {
  const toneClass = {
    dark: 'bg-slate-900 text-white',
    sky: 'bg-slate-800 text-sky-300',
    orange: 'bg-orange-100 text-orange-800'
  }[tone];

  return (
    <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-2xl text-sm font-semibold ${toneClass}`}>
      {label}
    </span>
  );
}

export default IconBubble;
