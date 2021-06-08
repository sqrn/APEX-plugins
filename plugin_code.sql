FUNCTION password_generator (
    p_dynamic_action   in apex_plugin.t_dynamic_action,
    p_plugin           in apex_plugin.t_plugin
) RETURN apex_plugin.t_dynamic_action_render_result 
AS
  l_result       apex_plugin.t_dynamic_action_render_result;
  l_characters   varchar2(1000);
  l_passwdLength number;
BEGIN

  l_characters   := p_dynamic_action.attribute_01;
  l_passwdLength := p_dynamic_action.attribute_02;


  APEX_JAVASCRIPT.ADD_LIBRARY(
      P_NAME        => 'PasswordGenerator',
      P_DIRECTORY   => p_plugin.file_prefix,
      P_VERSION     => NULL
  );

  l_result.javascript_function := 'function () { 
    var json = ' ||
          '{' ||
          apex_javascript.add_attribute('length', p_dynamic_action.attribute_02) ||
          apex_javascript.add_attribute('lower',  p_dynamic_action.attribute_03) ||
          apex_javascript.add_attribute('upper',  p_dynamic_action.attribute_04) ||
          apex_javascript.add_attribute('numbers',p_dynamic_action.attribute_05) ||
          apex_javascript.add_attribute('special',p_dynamic_action.attribute_06) ||
          apex_javascript.add_attribute('animate',p_dynamic_action.attribute_07) ||
          '};

    let passGen = new PasswordGenerator(json);
    PasswordGenerator.passwordGenerator(passGen,this); 

    }';
  
  RETURN l_result;

END;