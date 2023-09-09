import '@styles/globals.css';

export const metadata = {
  title: 'react13-project',
  description: 'A React 13 project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
}
