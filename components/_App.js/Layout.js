import Head from 'next/head';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className="container mx-auto">
                <Head>
                    <title>Sintec</title>
                    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
                </Head>
                {children}
            </main>
        </>
    );
}

export default Layout;