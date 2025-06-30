import { ChatPageWrapper } from '../../../../components/wrappers';
import siteConfig from '@/config/siteConfig';
import RepoPage from '@/containers/repopage/index';
import { Metadata } from 'next';

type Params = {
    username: string;
    repo: string;
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { username, repo } = await params;
    return {
        title: `${username}/${repo} - ${siteConfig.siteName}`,
        description: `Analyze and understand ${username}/${repo} with AI-powered code insights. Get detailed repository analysis, code quality metrics, and intelligent recommendations for improvements.`,
    }
}

async function page({ params }: { params: Params }) {
    const { username, repo } = await params;

    return (
        <ChatPageWrapper>
            <RepoPage username={username} repo={repo} />
        </ChatPageWrapper>
    )
}

export default page
