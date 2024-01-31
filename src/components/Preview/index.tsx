import {BenchMarkForm} from "../BenchMark/types.ts";
import BookTwoTone from '../../assets/BookTwoTone.svg'
import * as $ from './styles.ts';
import {marked} from "marked";
import DOMPurify from 'dompurify';

interface PreviewProps {
    formData: BenchMarkForm
}

const getMarkdownText = (data) => {
    const rawMarkup = marked(data);
    const cleanMarkup = DOMPurify.sanitize(rawMarkup);
    return {__html: cleanMarkup};
};

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
                        {benchMarkSource.data.length > 0 && benchMarkSource.data.map(val => <$.BenchMarkSourceData
                            dangerouslySetInnerHTML={getMarkdownText(val)}/>)}
                    </$.BenchMarkSource>
                ))
            }
        </$.PreviewContainer>
    );
};

export default Preview;