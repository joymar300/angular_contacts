import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef, untracked} from '@angular/core';

@Directive({
  selector: '[appRecarga]',
  standalone: true
})
export class RecargaDirective implements OnChanges {
  @Input() appRecarga !: boolean;
  constructor(private templateRef: TemplateRef<any>,private viewContainerRef: ViewContainerRef ) { 
    this.viewContainerRef.createEmbeddedView(templateRef);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appRecarga']&& changes['appRecarga'].previousValue != untracked) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }


}
