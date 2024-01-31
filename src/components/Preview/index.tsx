import {BenchMarkForm} from "../BenchMark/types.ts";
import BookTwoTone from '../../assets/BookTwoTone.svg'
import * as $ from './styles.ts';

interface PreviewProps {
    formData: BenchMarkForm
}

const Preview = ({formData}: PreviewProps) => {
    return (
        <$.PreviewContainer>
            {formData.name && <$.Title>
                {formData.name}
            </$.Title>}
            {formData.description && <$.Description>
                {formData.description}
            </$.Description>}
            {
                formData.benchMarkSources.map((benchMarkSource, index) => (
                    <$.BenchMarkSource key={index}>
                        {benchMarkSource.title && <$.BenchMarkSourceTitle>
                            <img src={BookTwoTone} alt="BookTwoTone"/>
                            {benchMarkSource.title}
                            <$.URL href={benchMarkSource.url}>URL</$.URL>
                        </$.BenchMarkSourceTitle>}
                        {benchMarkSource.data.length > 0 && <$.BenchMarkSourceData>
                            {benchMarkSource.data.join(' ')}
                        </$.BenchMarkSourceData>}
                    </$.BenchMarkSource>
                ))
            }
        </$.PreviewContainer>
    );
};

export default Preview;