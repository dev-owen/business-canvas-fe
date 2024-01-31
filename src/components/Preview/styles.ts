import styled from "@emotion/styled";

export const PreviewContainer = styled.div`
    display: flex;
    width: 372px;
    padding: 16px 12px 12px 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;

    font-family: Pretendard;
    border-radius: 6px;
    background: #FFF;
`

export const Title = styled.p`
    margin: 0;
    color: rgba(0, 0, 0, 0.88);
    font-variant-numeric: lining-nums tabular-nums;

    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 157.143% */
`

export const Description = styled.div`
    display: flex;
    padding: 6px 14px 10px 14px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 9px;
    align-self: stretch;

    border-radius: 5px;
    background: rgba(0, 0, 0, 0.04);

    color: rgba(0, 0, 0, 0.88);
    font-variant-numeric: lining-nums tabular-nums;

    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
`

export const BenchMarkSource = styled.div`
    display: flex;
    padding: 10px 6px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;

    // 여기서 피그마 시안은 점선인데, 속성은 다음과 같이 되어 있어서 실선으로 작성
    border-top: 1px solid #EAECEC;
`

export const BenchMarkSourceTitle = styled.div`
    display: flex;
    padding: 4px 0px;
    align-items: center;
    gap: 4px;
    align-self: stretch;

    color: rgba(0, 0, 0, 0.88);
    font-variant-numeric: lining-nums tabular-nums;

    /* SM/SM Strong */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 166.667% */
`;

export const BenchMarkSourceData = styled.div`
    display: flex;
    flex-direction: column;
    padding: 8px;
    gap: 10px;
    align-self: stretch;

    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    background: #FFF;

    color: rgba(0, 0, 0, 0.88);
    font-variant-numeric: lining-nums tabular-nums;

    /* SM/SM Normal */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */

    text-align: left;

    h1, h2, h3, h4, h5, h6, p {
        margin: 0;
        text-align: left;
    }
`

export const URL = styled.a`
    display: flex;
    padding: 0px 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;

    color: #58BF88;
    font-variant-numeric: lining-nums tabular-nums;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
`