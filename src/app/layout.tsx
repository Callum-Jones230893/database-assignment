import type { Metadata } from "next"
import localFont from 'next/font/local'
import { QueryClientProvider } from "../../providers/queryProvider"
import { Toaster } from "sonner"
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@/src/app/globals.css'

const lato = localFont({
  src: [
    {
      path: '../../public/fonts/Lato/Lato-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Lato/Lato-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
})

export const metadata: Metadata = {
  title: "Tournament forum",
  description: "Create, host and comment on tournaments",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${lato.className} tracking-wide antialiased`}
      >
      <body className="flex flex-col bg-background text-accent-one">
        <QueryClientProvider>
          <Toaster />
          <div className="flex flex-1 flex-col w-full text-text-primary">
            {children}
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
