import {useBlockProps} from '@wordpress/block-editor';
import {generateClamp} from '@lichtblick/functions';
import MyInspectorControls from "./components/InspectorControls";
export default function Edit({attributes, setAttributes})
{
    const {spacerSelectValue, toggle, customDesktopValue, customMobileValue} = attributes;

    const sectionStyles = {
        height: '',
        updateHeight(){
            if (!toggle) {
                this.height = spacerSelectValue;
                setAttributes({blockHeight: spacerSelectValue})
            } else {
                let calcHeight = generateClamp(Number(customDesktopValue), Number(customMobileValue));
                this.height = calcHeight;
                setAttributes({blockHeight: calcHeight})
            }
        }
    }
    sectionStyles.updateHeight();

    return (
    <>
      <MyInspectorControls setAttributes={setAttributes} attributes={attributes} />
      <div {...useBlockProps()} style={sectionStyles}></div>
    </>
    );
}
