export interface BenchMarkSource {
    title: string;
    url: string;
    data: string[];
}

export interface BenchMarkForm {
    name: string;
    description: string;
    benchMarkSource: BenchMarkSource[];
}