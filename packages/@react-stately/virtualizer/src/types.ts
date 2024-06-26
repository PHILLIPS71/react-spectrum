/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {Collection, Key} from '@react-types/shared';
import {Layout} from './Layout';
import {Rect} from './Rect';
import {ReusableView} from './ReusableView';

export interface InvalidationContext<O = any> {
  contentChanged?: boolean,
  offsetChanged?: boolean,
  sizeChanged?: boolean,
  itemSizeChanged?: boolean,
  layoutOptions?: O
}

export interface VirtualizerDelegate<T extends object, V, W> {
  setVisibleRect(rect: Rect): void,
  renderView(type: string, content: T): V,
  renderWrapper(
    parent: ReusableView<T, V> | null,
    reusableView: ReusableView<T, V>,
    children: ReusableView<T, V>[],
    renderChildren: (views: ReusableView<T, V>[]) => W[]
  ): W,
  invalidate(ctx: InvalidationContext): void
}

export interface VirtualizerRenderOptions<T extends object, O = any> {
  layout: Layout<T>,
  collection: Collection<T>,
  persistedKeys?: Set<Key>,
  visibleRect: Rect,
  invalidationContext: InvalidationContext,
  isScrolling: boolean,
  layoutOptions?: O
}

export type Mutable<T> = {
  -readonly[P in keyof T]: T[P]
};
