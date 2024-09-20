import { TextAnimation } from '@/components/text-animation';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <TextAnimation />
      <div className="h-screen w-full"></div>
      <div className="h-screen w-full"></div>
    </section>
  );
}
