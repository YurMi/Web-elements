<?php

namespace Lichtblick\Theme\Blocks\Spacer;

//printf('<div class="spacer" style="height: %1$s"></div>',
//    $attributes['blockHeight'] ?? '0px'
//);

/**
 * Spacer block render callback.
 *
 * @var array $attributes
 * */

$style = $attributes['blockHeight'] ? 'style="height:' . esc_attr($attributes['blockHeight']) . ';"' : ''
?>

<div <?= get_block_wrapper_attributes(['class' => 'spacer']);?>  <?= $style ?>></div>
