import useAuth from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import Head from 'next/head';
import { Report } from '../../components/Report';
import { FormReport } from '../../components/FormReport';
import TopBar from '../../components/TopBar';
import { RoomStyle } from '../../styles/room';
import { useRouter } from 'next/router';

export default function Room() {
  const { user } = useAuth();
  const router = useRouter();
  //pid is the uid
  const { uid } = router.query;
  const { title, reports } = useRoom(uid);

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
          <FormReport roomTitle={title} qtdPerguntas={reports.length || 0} />
          {reports ?
          <div className="report-list">
          {reports.map((report) => {
            return (
              <Report
                key={report.id}
                title={report.title}
                content={report.content}
                author={report.author}
                isAnswered={report.isAnswered}
                isHighlighted={report.isHighlighted}
              >
                {!report.isAnswered && (
                  <button
                    className={`like-button ${report.likeId ? 'liked' : ''}`}
                    type="button"
                    aria-label="Marcar como Gostei"
                    onClick={() =>
                      handleSendLikereport(report.id, report.likeId)
                    }
                  >
                    {report.likeCount > 0 && <span>{report.likeCount}</span>}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </Report>
            );
          })}
        </div> : <>Não temos ocorrencias ainda</>}

          {/* <Report
            author={user?.name || user?.email}
            authorIcon={user?.photoUrl}
            isSolved={false}
            underInvestigation={false}

            //icons
          >
          </Report>
          <Report />
          <Report /> */}
        </RoomStyle>
      </main>
    </div>
  );
}
