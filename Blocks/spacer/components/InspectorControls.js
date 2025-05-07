import {__} from "@wordpress/i18n";
import {InspectorControls} from '@wordpress/block-editor';
import {Panel, PanelBody, SelectControl, ToggleControl, TextControl} from '@wordpress/components';
import {useSelect} from '@wordpress/data';

export default function MyInspectorControls({attributes, setAttributes}) {
  const {spacerSelectValue, toggle, customDesktopValue, customMobileValue} = attributes;

  const themeSpacingSizes = useSelect((select) => {
    return select('core/editor')?.getEditorSettings().spacingSizes;
  }, []);

  const options = Object.entries(themeSpacingSizes).map(el => {
    return {label: el[1].name, value: el[1].size}
  })

  return (
    <InspectorControls key="setting">
      <Panel>
        <PanelBody title={__('Spacer Height', 'lichtblick')} initialOpen={true}>

          <ToggleControl
            checked={toggle}
            label="Set custom value?"
            onChange={() => setAttributes({toggle: !toggle})}
          />

          {options.length > 1 && !toggle &&
            <SelectControl
              value={spacerSelectValue}
              onChange={(val) => setAttributes({spacerSelectValue: val})}
              options={options}
            />
          }
          {options.length < 1 && !toggle &&
            <p> Spacer options is Empty 'custom in theme.json' </p>
          }

          {toggle &&
            <>
              <p>Custom fluid spacer from Desktop to Mobile </p>
              <TextControl
                label="Desktop"
                type='number'
                value={customDesktopValue}
                onChange={(val) => setAttributes({customDesktopValue: val})}
              />
              <TextControl
                label="Mobile"
                type='number'
                value={customMobileValue}
                onChange={(val) => setAttributes({customMobileValue: val})}
              />
            </>
          }
        </PanelBody>
      </Panel>
    </InspectorControls>
  )
}
