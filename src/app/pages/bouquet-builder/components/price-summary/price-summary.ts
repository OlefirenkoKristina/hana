import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BouquetPrice } from '../../../../core/bouquet-pricing';
import { UahPipe } from '../../../../shared/uah.pipe';

/** Картка з розрахунком вартості букета. */
@Component({
  selector: 'app-price-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UahPipe],
  templateUrl: './price-summary.html',
  styleUrl: './price-summary.scss',
})
export class PriceSummary {
  readonly price = input.required<BouquetPrice>();
  readonly stemCount = input.required<number>();
}
