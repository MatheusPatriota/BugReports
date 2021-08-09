import useAuth from '../../hooks/useAuth';
import Head from 'next/head';
import { Report } from '../../components/Report';
import TopBar from '../../components/TopBar';
import { RoomStyle } from '../../styles/room';
import { useEffect } from 'react';

export default function Room() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log(user.email === 'mpatriota55@gmail.com');
      if (!(user.email === 'mpatriota25@gmail.com')) {
        Router.push('/admin');
      }
    }
  }, [user]);

  return (
    <div>
      <Head>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
              if (!document.cookie || !document.cookie.includes('user-auth')) {
                window.location.href = "/"
              }
            `,
          }}
        />
      </Head>
      <TopBar />
      <main>
        <RoomStyle>
          <Report />
          <Report />
          <Report />
        </RoomStyle>
      </main>
    </div>
  );
}
