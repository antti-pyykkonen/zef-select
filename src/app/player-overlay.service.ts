import { DropdownOverlay } from './zef-dropdown/dropdown-overlay/dropdown-overlay.component';
import { Injectable, ElementRef } from '@angular/core';
import { Overlay, OriginConnectionPosition, OverlayConnectionPosition, OverlayConfig, ScrollStrategy } from '@angular/cdk/overlay';
import { Portal, ComponentPortal } from '@angular/cdk/portal';

@Injectable()
export class PlayerOverlay {
  private overlayRef: any;
  public openDropdown(connected: ElementRef) {
    if (this.overlayRef) {
      this.close();
      return;
    }

    const origin: OriginConnectionPosition = { originX: 'center', originY: 'top' };
    const overlay: OverlayConnectionPosition = { overlayX: 'center', overlayY: 'top' };
    const positionStrategy = this.overlay
      .position()
      .connectedTo(connected, origin, overlay);

    const scrollStrategy: ScrollStrategy = this.overlay.scrollStrategies.noop();

    const config = new OverlayConfig({
      positionStrategy,
      scrollStrategy
    });

    this.overlayRef = this.overlay.create(config);

    const dropdownPortal = new ComponentPortal(DropdownOverlay);

    this.overlayRef.attach(dropdownPortal);
  }

  constructor(private overlay: Overlay) { }
}
