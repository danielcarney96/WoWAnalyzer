import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SkullIcon from 'interface/icons/Skull';

import Icon from 'common/Icon';
import getFightName from 'common/getFightName';
import { getReport } from 'interface/selectors/report';
import { getFightId, getPlayerId, getPlayerName, getResultTab } from 'interface/selectors/url/report';
import makeAnalyzerUrl from 'interface/common/makeAnalyzerUrl';
import { findByBossId } from 'raids';

import './FightNavigationBar.css';
import SkullRaidMarker from './Results/images/skull-raidmarker.png';

class FightNavigationBar extends React.PureComponent {
  static propTypes = {
    report: PropTypes.shape({
      code: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      fights: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        difficulty: PropTypes.number,
        boss: PropTypes.number.isRequired,
        start_time: PropTypes.number.isRequired,
        end_time: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        kill: PropTypes.bool,
      })),
    }),
    fightId: PropTypes.number,
    playerId: PropTypes.number,
    playerName: PropTypes.string,
    resultTab: PropTypes.string,
  };

  render() {
    const { report, playerId, fightId, playerName, resultTab } = this.props;
    if (!report) {
      return null;
    }

    const player = playerId ? report.friendlies.find(friendly => friendly.id === playerId) : report.friendlies.find(friendly => friendly.name === playerName);
    if (!player) {
      return null;
    }

    return (
      <nav className="fight">
        <div>
          <ul>
            {player.fights
              .map(f => report.fights[f.id - 1])
              .filter(fight => fight.boss !== 0)
              .map(fight => {
                const boss = findByBossId(fight.boss);

                return (
                  <li
                    key={fight.id}
                    className={`${fight.id === fightId ? 'selected' : ''} ${fight.kill ? 'kill' : 'wipe'}`}
                    data-tip={getFightName(report, fight)}
                    data-place="right"
                  >
                    <Link to={makeAnalyzerUrl(report, fight.id, playerId, resultTab)}>
                      <figure>
                        {boss && boss.icon ? <Icon icon={boss.icon} alt={boss ? boss.name : fight.name} /> : (
                          <img
                            src={boss ? boss.headshot : SkullRaidMarker}
                            alt={boss ? boss.name : fight.name}
                          />
                        )}
                        <div className="over-image">
                          {fight.kill ? <SkullIcon /> : `${Math.floor(fight.fightPercentage / 100)}%`}
                        </div>
                      </figure>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  report: getReport(state),
  fightId: getFightId(state),
  playerId: getPlayerId(state),
  playerName: getPlayerName(state),
  resultTab: getResultTab(state),
});

export default connect(mapStateToProps)(FightNavigationBar);