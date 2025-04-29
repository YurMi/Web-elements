<?php

/**
 * Display lazy image structure
 *
 * @param array|int|string $image Image array, attachment ID or URL.
 * @param array $attr Additional attributes like 'class', 'alt', etc.
 */
function lazy_image($image, $attr = []): void
{
    $render_image = function ($full_src, $alt) use ($attr) {

        $attributes = array_merge(
            $attr ?? [],
            [
                'data-lazy' => esc_url($full_src),
                'alt' => esc_attr($alt),
                'width' => 'auto',
                'height' => 'auto',
                'loading' => 'lazy'
            ]
        );

        $attr_string = '';
        foreach ($attributes as $key => $value) {
            $attr_string .= sprintf('%s="%s" ', esc_attr($key), esc_attr($value));
        }

        printf(
            '<span %s /></span>',
            trim($attr_string)
        );
    };

    //acf image field
    if (is_array($image)) {
        if (!$image['url']) {
            return;
        }

        $render_image(
            $image['url'],
            $image['alt'] ?? ''
        );

        return;
    }

    //==== if $image is int|string ====

    //image file type svg
    $image_url = wp_get_attachment_image_url($image);
    $ext = pathinfo($image_url, PATHINFO_EXTENSION);

    if (strtolower($ext) === 'svg') {
        echo wp_get_attachment_image($image, 'full', false, ['loading' => 'lazy']);
        return;
    }

    //Image ID ( usually post thumbnail )
    $image_options = wp_get_attachment_metadata($image);
    if (!$image_options) {
        return;
    }

    //if only small image
    if (!$image_options['sizes']) {
        echo wp_get_attachment_image($image, 'full', false, ['loading' => 'lazy']);
        return;
    }

    $render_image(
        wp_get_attachment_image_src($image, 'full')[0] ?? '',
        get_post_meta($image, '_wp_attachment_image_alt', true) ?? ''
    );
}