import {
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  defaultArticleState,
  type OptionType,
} from '@/constants/articleProps';
import { clsx } from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const [formState, setFormState] = useState(defaultArticleState);

  const handleChange =
    (field: keyof typeof defaultArticleState): ((value: OptionType) => void) =>
    (value: OptionType): void => {
      setFormState((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleApply = (e: React.FormEvent): void => {
    e.preventDefault();
    onApply(formState);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent): void => {
      if (
        isOpen &&
        asideRef.current &&
        !asideRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <aside
        ref={asideRef}
        className={clsx(styles.container, isOpen && styles.container_open)}
      >
        <form className={styles.form} onSubmit={handleApply}>
          {/* Выбор шрифта */}
          <div className={styles.formElement}>
            <Select
              title="Шрифт"
              options={fontFamilyOptions}
              selected={formState.fontFamilyOption}
              onChange={(value) => handleChange('fontFamilyOption')(value)}
            />
          </div>

          {/* Выбор размера шрифта */}
          <div className={styles.formElement}>
            <RadioGroup
              name="fontSize"
              title="Размер шрифта"
              options={fontSizeOptions}
              selected={formState.fontSizeOption}
              onChange={(value) => handleChange('fontSizeOption')(value)}
            />
          </div>

          {/* Выбор цвета шрифта */}
          <div className={styles.formElement}>
            <Select
              title="Цвет шрифта"
              options={fontColors}
              selected={formState.fontColor}
              onChange={(value) => handleChange('fontColor')(value)}
            />
          </div>

          <div className={styles.separatorWrapper}>
            <Separator />
          </div>

          {/* Выбор цвета фона */}
          <div className={styles.formElement}>
            <Select
              title="Цвет фона"
              options={backgroundColors}
              selected={formState.backgroundColor}
              onChange={(value) => handleChange('backgroundColor')(value)}
            />
          </div>

          {/* Выбор ширины контента */}
          <div className={styles.formElement}>
            <Select
              title="Ширина контента"
              options={contentWidthArr}
              selected={formState.contentWidth}
              onChange={(value) => handleChange('contentWidth')(value)}
            />
          </div>

          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              htmlType="reset"
              type="clear"
              onClick={handleReset}
            />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
