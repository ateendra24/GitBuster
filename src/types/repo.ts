export interface RepoInputProps {
    onProcessed: () => void;
    onUrlChange: (url: string) => void;
}

export interface RepoAnalysisProps {
    url: string;
} 