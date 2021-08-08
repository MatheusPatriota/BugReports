import useAuth from '../hooks/useAuth';
import Head from 'next/head';
import { Report } from '../components/Report';
import { FormReport } from '../components/FormReport';
import TopBar from '../components/TopBar';
import { RoomStyle } from '../styles/room';

export default function Room() {
  const { user } = useAuth();
  // console.log("user", user);
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
        {/* {user ? user.name : 'User'} */}
        <RoomStyle>
          <FormReport />
          <Report />
          <Report />
          <Report />
        </RoomStyle>
      </main>
    </div>
  );
}
