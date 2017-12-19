import { DropdownOverlay } from './zef-dropdown/dropdown-overlay/dropdown-overlay.component';
import { Injectable, ElementRef } from '@angular/core';
import { Overlay, OriginConnectionPosition, OverlayConnectionPosition,
  OverlayConfig, ScrollStrategy, OverlayRef } from '@angular/cdk/overlay';
import { Portal, ComponentPortal } from '@angular/cdk/portal';

export class OverlayDropdownRef {
  constructor(private overlayRef: OverlayRef) {}

  close() {
    this.overlayRef.dispose();
  }
}

@Injectable()
export class PlayerOverlay {

  constructor(private overlay: Overlay) { }

  public openDropdown(connected: ElementRef, items: any[]) {
    const origin: OriginConnectionPosition = { originX: 'start', originY: 'bottom' };
    const overlay: OverlayConnectionPosition = { overlayX: 'start', overlayY: 'top' };
    const positionStrategy = this.overlay
      .position()
      .connectedTo(connected, origin, overlay);

    const scrollStrategy: ScrollStrategy = this.overlay.scrollStrategies.noop();

    const config = new OverlayConfig({
      positionStrategy,
      scrollStrategy
    });

    const overlayRef = this.overlay.create(config);
    const dropdownPortal = new ComponentPortal(DropdownOverlay);

    const componentRef = overlayRef.attach(dropdownPortal);

    componentRef.instance.items = items;

    return new OverlayDropdownRef(overlayRef);
  }
}
