import { media } from '../../content/site';
import { Icon, type IconName } from '../ui/Icon';

const previewIcons: IconName[] = ['search', 'database', 'scanner', 'cube', 'book', 'bookmark'];

/** Decorative product chrome: search below it is a real native form. */
export function SearchChrome() {
  return (
    <div className="search-chrome" aria-hidden="true">
      <div className="search-chrome__surface" />
      <div className="search-chrome__mobile-brand">
        <img src={media('logo.svg')} width="110" height="22" alt="" />
        <Icon name="menu" />
      </div>
      <div className="search-chrome__rail">
        <img src={media('favicon.svg')} width="26" height="26" alt="" />
        {previewIcons.map((name, index) => (
          <span key={name} className={index === 0 ? 'is-selected' : undefined}>
            <Icon name={name} />
          </span>
        ))}
      </div>
      <div className="search-chrome__filters">
        <span>
          Add Filter <Icon name="plus" />
        </span>
        <span>
          All Types <Icon name="chevron" />
        </span>
      </div>
      <div className="search-chrome__account">
        <span>
          Credits: <b>2 000</b>
        </span>
        <span className="search-chrome__upgrade">Upgrade Plan</span>
      </div>
    </div>
  );
}
