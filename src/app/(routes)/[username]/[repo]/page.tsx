import ChatPageWrapper from '@/components/wrappers/ChatPageWrapper';
import RepoPage from '@/containers/repopage/index';

type Params = {
    username: string;
    repo: string;
};

async function page({ params }: { params: Params }) {
    const { username, repo } = await params;

    return (
        <ChatPageWrapper>
            <RepoPage username={username} repo={repo} />
        </ChatPageWrapper>
    )
}

export default page
