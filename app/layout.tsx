export const metadata = {
  title: 'Range Component',
  description: 'A React component for selecting ranges of values.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <h1>Try the Range component</h1>
        {children}
      </body>
    </html>
  )
}
