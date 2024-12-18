import { html } from "https://esm.sh/htm/preact/standalone";
import UNIT from "../data/units.js";
import SKILLS from "../data/skills.js";
import { COMBAT_FLAG, SKILL_TYPE, WEAPON_TYPE } from "../data/definitions.js";
import Engine from "../engine.js";
import UnitInfo from "./UnitInfo.js";

const engine = Engine();

const getSkillInfo = (unit, skillType) => SKILLS[unit.skills.find(skill => SKILLS[skill].type === skillType)];
const getWeaponInfo = unit => getSkillInfo(unit, SKILL_TYPE.WEAPON);
const getAssistInfo = unit => getSkillInfo(unit, SKILL_TYPE.ASSIST);
const getSpecialInfo = unit => getSkillInfo(unit, SKILL_TYPE.SPECIAL);
const getWeaponType = unit => WEAPON_TYPE[UNIT[unit.unitId].weaponType];

const InfoPanel = ({ gameState, unit, potentialAction, playingAs }) => {
  if (potentialAction.target) {
    return html`<${ActionPreview} gameState=${gameState} potentialAction=${potentialAction} />`;
  }
  if (unit) {
    const backgroundType = gameState.mode === "duel" ? "absolute" : "relative";
    return html`<${UnitInfo} unit=${unit} backgroundType=${backgroundType} playingAs=${playingAs} />`
  }
  return html`<div class="info-panel"></div>`;
}

const ActionPreview = ({ gameState, potentialAction }) => {
  const unit = [...gameState.teams[0], ...gameState.teams[1]]
    .find(unit => unit.pos.x === potentialAction.from.x && unit.pos.y === potentialAction.from.y);
  const unitInfo = UNIT[unit.unitId];
  const target = [...gameState.teams[0], ...gameState.teams[1]]
    .find(unit => unit.pos.x === potentialAction.target.x && unit.pos.y === potentialAction.target.y)
  const targetInfo = UNIT[target.unitId];
  const actionType = unit.team === target.team ? "assist" : "attack";
  const backgroundType = gameState.mode === "duel" ? "absolute" : "relative";
  const backgrounds = ["mediumturquoise", "darkred"];
  let leftBackground;
  let rightBackground;
  if (backgroundType === "relative") {
    leftBackground = 0;
    rightBackground = actionType === "assist" ? 0 : 1;
  } else {
    leftBackground = unit.team === 0 ? 0 : 1;
    rightBackground = actionType === "assist" ? leftBackground : leftBackground ^ 1;
  }

  let unitRemainingHp = unit.stats.hp;
  let targetRemainingHp = target.stats.hp;
  let assist;
  let result;
  let formulas;

  if (actionType === "assist") {
    assist = getAssistInfo(unit).name; // todo implement calculateAssistResult
  } else {
    const unitPos = unit.pos;
    unit.pos = { ...potentialAction.to }
    result = engine.calculateCombatResult(gameState, unit, target);
    unit.pos = unitPos;
    unitRemainingHp = result.units[0].stats.hp;
    targetRemainingHp = result.units[1].stats.hp;
    formulas = [0, 1].map(i => {
      const { canAttack, baseDamage, constantFixedDamage, staffMod, canDouble } = result.units[i];
      const attacksTwice = result.units[i].flags[COMBAT_FLAG.ATTACKS_TWICE];
      if (!canAttack) return "-";
      let hits = 1;
      if (canDouble) hits *= 2;
      if (attacksTwice) hits *= 2;
      return `${Math.floor((baseDamage + Math.floor(constantFixedDamage)) * staffMod)}${hits > 1 ? `x${hits}` : ""}`;
    });
  }

  const renderTempStats = stats => {
    return Object.entries(stats)
      .filter(([_, value]) => value !== 0)
      .map(([stat, value]) => {
        const color = value > 0 ? 'blue' : 'red';
        const sign = value > 0 ? '+' : '';
        return html`${stat.charAt(0).toUpperCase() + stat.slice(1)} <span style="color: ${color}; margin-right: 4px; ">${sign}${value}</span>`;
      });
  };

  return html`<div class="info-panel">
    <div style="flex: 1 1 20%; display: flex; align-items: center; justify-content: center; background: ${backgrounds[leftBackground]};">
      <img src=${unitInfo.imgFace} alt=${unitInfo.name} style="width: 100%; max-width: 80px; object-fit: contain;" />
    </div>
    <div style="flex: 1 1 30%; display: flex; align-items: center; flex-direction: column; background: ${backgrounds[leftBackground]};">
      <h2>${unitInfo.name}</h2>
      <p>${unit.stats.hp} → ${unitRemainingHp}</p>
      ${actionType === "assist" && html`<p>${assist}</p>`}
      ${actionType === "attack" && html`<p>${formulas[0]}</p>`}
      ${actionType === "attack" && html`<p>${renderTempStats(result.units[0].tempStats)}</p>`}
    </div>
    <div style="flex: 1 1 30%; display: flex; align-items: center; flex-direction: column; background: ${backgrounds[rightBackground]};">
      <h2>${targetInfo.name}</h2>
      <p>${target.stats.hp} → ${targetRemainingHp}</p>
      ${actionType === "attack" && html`<p>${formulas[1]}</p>`}
      ${actionType === "attack" && html`<p>${renderTempStats(result.units[1].tempStats)}</p>`}
    </div>
    <div style="flex: 1 1 20%; display: flex; align-items: center; justify-content: center; background: ${backgrounds[rightBackground]};">
      <img src=${targetInfo.imgFace} alt=${targetInfo.name} style="width: 100%; max-width: 80px; object-fit: contain;" />
    </div>
  </div>`;
}

export default InfoPanel;
