export function useValidate() {
  return (
    formObj: Record<string, any>,
    formRules: Record<string, any>,
  ): object => {
    const rules = formRules;
    for (const rule in rules) {
      if (!formObj[rule]) {
        continue;
      }
      const field = rules[rule];
      let customMessage = false;
      // check if custom message was set.
      if (Object.prototype.hasOwnProperty.call(field, "customMessage")) {
        customMessage = true;
        field.message = field.customMessage;
      }

      for (const ruleItem in field) {
        if (ruleItem === "maxLength" || ruleItem === "minLength") {
          const currentValue = formObj[rule]?.length;
          const isTooShort = currentValue < field.minLength;
          const isTooLong = currentValue > field.maxLength;
          rules[rule].hasError = false;
          if (isTooShort || isTooLong) {
            rules[rule].hasError = true;
            // only generate programmatic message if custom message is not set
            if (!customMessage) {
              rules[rule].message = formatErrorMsg(
                rules,
                rule,
                `_ too short. Min length ${field.minLength} characters`,
              );
              if (isTooLong) {
                rules[rule].message = formatErrorMsg(
                  rules,
                  rule,
                  `_ too long. Max length ${field.maxLength} characters`,
                );
              }
            }

            // alert(rule + ' too long!');
          }
        }
        else if (ruleItem === "min" || ruleItem === "max") {
          const currentValue = formObj[rule];
          rules[rule].hasError = false;
          // check if the value is a number
          if (Number.isNaN(Number.parseInt(currentValue))) {
            rules[rule].hasError = true;
            rules[rule].message = formatErrorMsg(
              rules,
              rule,
              `_ should be a number `,
            );
          }
          else {
            const isSmaller = Number(currentValue) < Number(field.min);
            const isBigger = Number(currentValue) > Number(field.max);
            if (isSmaller || isBigger) {
              rules[rule].hasError = true;
              let minAmount = field.min;
              const maxAmount = field.max;
              // make min amount 1 if frequency is yearly (instead of it showing 0)
              if (formObj.frequency === "yearly" && rule === "period") {
                minAmount = 1;
              }
              if (!customMessage) {
                rules[rule].message = formatErrorMsg(
                  rules,
                  rule,
                  `_ too small. Min amount ${minAmount} `,
                );
                if (isBigger) {
                  rules[rule].message = formatErrorMsg(
                    rules,
                    rule,
                    `_ too big. Max amount ${maxAmount}`,
                  );
                }
              }
            }
          }
        }
        // if the field has minSize or maxSize for images or files
        else if (ruleItem === "minSize" || ruleItem === "maxSize") {
          const lowestFileSize = Number(field.minSize) * 1024; // KB
          const highestFileSize = Number(field.maxSize) * 1024; // KB
          const file = formObj[rule];
          if (file) {
            const isSmaller = file.size < lowestFileSize;
            const isBigger = file.size > highestFileSize;
            if (isSmaller || isBigger) {
              rules[rule].hasError = true;
              rules[rule].message = formatErrorMsg(
                rules,
                rule,
                `_ size too small. Min 20KB `,
              );
              if (isBigger) {
                rules[rule].message = formatErrorMsg(
                  rules,
                  rule,
                  `_ size too big. Max 5MB `,
                );
              }
            }
          }
        }
        // if the field has a type property
        else if (ruleItem === "type") {
          rules[rule].hasError = false;
          const fieldType = rules[rule][ruleItem];
          if (fieldType === "email") {
            const re = /\S[^\s@]*@\S+\.\S+/;
            if (!re.test(formObj[rule])) {
              rules[rule].hasError = true;
              if (!customMessage) {
                rules[rule].message = formatErrorMsg(
                  rules,
                  rule,
                  `Enter valid _`,
                );
              }
            }
          }
          else if (fieldType === "tel") {
            // const re = /^[+]?(234)?0?[7-9][0-1][0-9]{8}$/;
            const re = /^0?[7-9][01]\d{8}$/;
            if (!re.test(formObj[rule])) {
              rules[rule].hasError = true;
              if (!customMessage) {
                rules[rule].message = formatErrorMsg(
                  rules,
                  rule,
                  `Enter valid _. Format (080...)`,
                );
              }
            }
          }
          // validate date
          else if (fieldType === "date") {
            let dateValue: Date | string = "";
            try {
              dateValue = new Date(formObj[rule]);
            }
            catch (error) { console.warn(error); }
            if (dateValue === "Invalid Date") {
              rules[rule].hasError = true;
              if (!customMessage) {
                rules[rule].message = formatErrorMsg(
                  rules,
                  rule,
                  `Start day must be today or after`,
                );
              }
            }
            else {
              /* if (rules[rule].hasOwnProperty("minDate")) {
                if (dateValue < new Date(rules[rule].minDate)) {
                  rules[rule]["hasError"] = true;
                  if (!customMessage) {
                    rules[rule]["message"] = formatErrorMsg(
                      rules,
                      rule,
                      `Start day must be today or after`
                    );
                  }
                }
              } */
              if (Object.prototype.hasOwnProperty.call(rules[rule], "maxDate")) {
                if (dateValue > new Date(rules[rule].maxDate)) {
                  rules[rule].hasError = true;
                  if (!customMessage) {
                    rules[rule].message = formatErrorMsg(
                      rules,
                      rule,
                      `birth date should not be earlier than 18 years ago`,
                    );
                  }
                }
              }
            }
          }
          // validate image
          else if (fieldType === "image") {
            const allowedImageTypes = ["png", "jpg", "jpeg", "gif"];
            const image = formObj[rule];
            if (image) {
              const imageNameArr = image.name.split(".");
              if (
                !allowedImageTypes.includes(
                  imageNameArr[imageNameArr.length - 1],
                )
              ) {
                rules[rule].hasError = true;
                if (!customMessage) {
                  rules[rule].message = formatErrorMsg(
                    rules,
                    rule,
                    `Please choose .png or .jpg image`,
                  );
                }
              }
            }
            else {
              rules[rule].hasError = true;
              rules[rule].message = formatErrorMsg(
                rules,
                rule,
                `Please choose an image to upload`,
              );
            }
          }
          // validate doc
          else if (fieldType === "doc") {
            const allowedFileTypes = [
              "pdf",
              "doc",
              "docx",
              "png",
              "jpg",
              "jpeg",
              "gif",
            ];
            const doc = formObj[rule];
            if (doc) {
              const fileNameArr = doc.name.split(".");
              if (
                !allowedFileTypes.includes(fileNameArr[fileNameArr.length - 1])
              ) {
                rules[rule].hasError = true;
                if (!customMessage) {
                  rules[rule].message = formatErrorMsg(
                    rules,
                    rule,
                    `Please choose .pdf, png, jpg or .doc file`,
                  );
                }
              }
            }
            else {
              rules[rule].hasError = true;
              rules[rule].message = formatErrorMsg(
                rules,
                rule,
                `Please choose document to upload`,
              );
            }
          }
        }
      }
    }
    return rules;
  };
}
function formatErrorMsg(rules: Record<string, any>, rule: string, msg: string) {
  const fieldName = Object.prototype.hasOwnProperty.call(rules[rule], "name")
    ? rules[rule].name
    : rule.replaceAll("_", " ");
  // let fieldName = rule.replaceAll('_', ' ');
  return msg.replaceAll("_", fieldName);
}
